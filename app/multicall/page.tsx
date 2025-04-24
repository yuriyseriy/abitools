"use client";

import { useState } from "react";
import { decodeFunctionData, parseAbi } from "viem";

const abi = parseAbi([
  "struct Call { address target; bytes callData; }",
  "struct Call3 { address target; bool allowFailure; bytes callData; }",
  "struct Call3Value { address target; bool allowFailure; uint256 value; bytes callData; }",
  "struct Result { bool success; bytes returnData; }",
  "function aggregate(Call[] calldata calls) public payable returns (uint256 blockNumber, bytes[] memory returnData)",
  "function aggregate3(Call3[] calldata calls) public payable returns (Result[] memory returnData)",
  "function aggregate3Value(Call3Value[] calldata calls) public payable returns (Result[] memory returnData)",
  "function blockAndAggregate(Call[] calldata calls) public payable returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData)",
  "function getBasefee() view returns (uint256 basefee)",
  "function getBlockHash(uint256 blockNumber) view returns (bytes32 blockHash)",
  "function getBlockNumber() view returns (uint256 blockNumber)",
  "function getChainId() view returns (uint256 chainid)",
  "function getCurrentBlockCoinbase() view returns (address coinbase)",
  "function getCurrentBlockDifficulty() view returns (uint256 difficulty)",
  "function getCurrentBlockGasLimit() view returns (uint256 gaslimit)",
  "function getCurrentBlockTimestamp() view returns (uint256 timestamp)",
  "function getEthBalance(address addr) view returns (uint256 balance)",
  "function getLastBlockHash() view returns (bytes32 blockHash)",
  "function tryAggregate(bool requireSuccess, Call[] calldata calls) public payable returns (Result[] memory returnData)",
  "function tryBlockAndAggregate(bool requireSuccess, Call[] calldata calls) public payable returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData)",
]);

export default function Multicall() {
  const [data, setData] = useState("");
  const [decoded, setDecoded] = useState<unknown[]>([]);

  const handleEncode = () => {
    const result = decodeFunctionData({
      abi,
      //   functionName: "aggregate",
      data: data as `0x${string}`,
    });

    setDecoded(Array.isArray(result.args) ? [...result.args] : []);
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      <div className="text-2xl font-bold">Multicall Encoder</div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="calldata" className="font-medium text-sm">
            Call Data
          </label>
          <input
            type="text"
            id="data"
            defaultValue={data}
            onChange={(e) => setData(e.target.value)}
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter calldata..."
          />
          <button
            onClick={handleEncode}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Encode
          </button>
        </div>
        {decoded.length > 0 && (
          <div className="flex flex-col gap-2">
            <label htmlFor="encoded" className="font-medium text-sm">
              Encoded
            </label>
            <div className="whitespace-pre-wrap overflow-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <pre>{JSON.stringify(decoded, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
