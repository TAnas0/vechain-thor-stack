import { useEffect, useState } from 'react';

import { Main } from '@/templates/Main';

const getNodeStatus = async () => {
  const resp = await fetch(
    `http://${process.env.NEXT_PUBLIC_THOR_ENDPOINT}:${process.env.NEXT_PUBLIC_THOR_PORT}/status`
  );
  return resp.json();
};

const Status = () => {
  const [status, setStatus] = useState({
    bestBlock: { number: null },
    finalizedBlock: { number: null },
    veblocksBestBlock: { number: null },
    veblocksFinalizedBlock: { number: null },
  });

  useEffect(() => {
    getNodeStatus()
      .then((resp) => {
        setStatus(resp);
        console.log(resp);
      })
      .catch(console.error);
    const periodicTask = setInterval(() => {
      getNodeStatus()
        .then((resp) => {
          setStatus(resp);
          console.log(resp);
        })
        .catch(console.error);
    }, 1000);
    return () => clearInterval(periodicTask);
  }, []);

  return (
    <Main meta="">
      Our best block: {status.bestBlock.number}
      <br />
      Our finalized block: {status.finalizedBlock.number}
      <br />
      VeBlocks best block: {status.veblocksBestBlock.number}
      <br />
      VeBlocks finalized block: {status.veblocksFinalizedBlock.number}
      <br />
      Remaining blocks so far:{' '}
      {status.veblocksBestBlock.number - status.bestBlock.number}
      <br />
      <br />
      <br />
      Full response:
      <pre>{JSON.stringify(status, null, 2)}</pre>
    </Main>
  );
};

export default Status;
