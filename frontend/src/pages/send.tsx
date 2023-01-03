import { useState } from "react";
import { Main } from "@/templates/Main";

const Send = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("");
  const [from, setFrom] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [mnemonicWords, setMnemonicWords] = useState("");
  const [response, setResponse] = useState({});


  return (
    <Main meta="">
      <form
        action=""
        className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <label
          htmlFor=""
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          To:
          <input
            type="text"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="focus:shadow-outline appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </label>
        <label
          htmlFor=""
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Amount:
          <input
            type="text"
            value={amount}
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
            className="focus:shadow-outline appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </label>
        <label
          htmlFor=""
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Data:
          <input
            type="text"
            name="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="focus:shadow-outline appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </label>
        <label
          htmlFor=""
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          From:
          <input
            type="text"
            name="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="focus:shadow-outline appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </label>
        <label
          htmlFor=""
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Private Key:
          <input
            name="privateKey"
            type="password"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            className="focus:shadow-outline appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </label>
        <label
          htmlFor=""
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Mnemonic Words:
          <input
            type="text"
            name="mnemonicWords"
            value={mnemonicWords}
            onChange={(e) => setMnemonicWords(e.target.value)}
            className="focus:shadow-outline appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </label>
        <button type="submit">Create</button>
      </form>
      <div>{JSON.stringify(response)}</div>
    </Main>
  );
};

export default Send;
