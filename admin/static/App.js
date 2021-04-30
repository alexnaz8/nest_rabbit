const queues = ['main_queue', 'rare_queue', 'send_all'];
const getQueueName = (str) =>
  str
    .split('_')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
const consumers = [
  'Handler1',
  'Handler2',
  'Rarely used handler' /*,'All queues'*/,
];
const handlersTime = {};
const baseTime = 10;
const App = () => {
  const [amount, setAmount] = React.useState(0);
  const [socket, setSocket] = React.useState(null);
  const [selectedQueue, setSelectedQueue] = React.useState(queues[0]);
  const [workingConsumers, setWorkingConsumers] = React.useState([]);

  const timeSetter = React.useCallback(
    _.debounce((workingConsumers) => {
      workingConsumers.forEach((consumer) => {
        setTimeout(() => {
          setWorkingConsumers(
            workingConsumers.filter((item) => item !== consumer),
          );
        }, handlersTime[consumer]);
      });
    }, 500),
    [],
  );
  React.useEffect(() => {
    const socketIO = io('http://localhost:8010');
    socketIO.on('msgToClient', (socketResp) => {
      console.log({ socketResp });
      const consumerName = socketResp.split(' ')[0];
      setWorkingConsumers((prev) => [...new Set([...prev, consumerName])]);
      if (!handlersTime[consumerName]) {
        handlersTime[consumerName] = baseTime;
      } else {
        handlersTime[consumerName] += baseTime;
      }
    });
    setSocket(socketIO);
    return () => socketIO.disconnect();
  }, []);

  React.useEffect(() => {
    workingConsumers.length && timeSetter(workingConsumers);
  }, [workingConsumers]);

  const onChangeHandler = (e) => {
    if (e.target.value !== selectedQueue) {
      setSelectedQueue(e.target.value);
    }
  };

  return (
    <div>
      <div>
        <h1>Select where to publish</h1>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div>
          {queues.map((queue, i) => (
            <React.Fragment key={queue}>
              <input
                type="radio"
                id={'choice' + i}
                name="queue"
                value={queue}
                checked={queue === selectedQueue}
                onChange={onChangeHandler}
              />
              <label htmlFor={'choice' + i}>{getQueueName(queue)}</label>
            </React.Fragment>
          ))}
        </div>
        <button
          type="button"
          disabled={!amount || amount < 0}
          onClick={async () => {
            const response = await fetch('/products/many', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify({
                name: 'Butter',
                data: 'Natural product',
                amount,
                queue: selectedQueue,
              }),
            });
          }}
        >{`Create ${amount} messages for queue`}</button>
      </div>
      <div>
        <h3>Consumers:</h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {consumers.map((consumer) => (
            <div key={consumer}>
              <h4>{consumer}:</h4>
              <div
                style={{
                  width: '200px',
                  height: '150px',
                  backgroundImage: `url(${
                    workingConsumers.includes(consumer.split(' ')[0])
                      ? consumer.toLowerCase().includes('all')
                        ? 'rabbit_watching.gif'
                        : 'rabbit_eats.gif'
                      : 'rabbit_sleeps.gif'
                  })`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
