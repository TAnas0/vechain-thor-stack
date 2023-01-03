import { useEffect, useState } from 'react';

import { Main } from '@/templates/Main';

const getNodeStatus = async () => {
  const resp = await fetch(
    `http://${process.env.NEXT_PUBLIC_THOR_ENDPOINT}:${process.env.NEXT_PUBLIC_THOR_PORT}/status`
  );
  return resp.json();
};

const Status = () => {
  const [status, setStatus] = useState({});

  useEffect(() => {
    getNodeStatus()
      .then((resp) => {
        setStatus(resp);
        console.log(resp);
      })
      .catch(console.error);
  }, []);

  return (
    <Main meta="">
      <div>{JSON.stringify(status)}</div>
    </Main>
  );
};

export default Status;
