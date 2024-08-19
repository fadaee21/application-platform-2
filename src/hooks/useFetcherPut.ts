import useAxiosPrivate from "./context/useAxiosPrivate";

/**
 * useFetcherPut
 *
 * This hook is used to send data to the server with the PUT method.
 * It uses the private axios instance which has the token in its header.
 *
 * @returns A function that takes a string (url) and an object (arg) as parameters and returns a Promise.
 * The Promise resolves to the response data after the request is finished.
 *
 * @example
 * const fetcherPut = useFetcherPut();
 *
 * const { trigger, isMutating } = useSWRMutation(
 *   "/panel/edit",
 *   fetcherPut<TEditInfo, EditResponse>
 * );
 *
 * const response = await trigger({
 *   id: "123",
 *   newName: "New Name",
 * });
 */
const useFetcherPut = () => {
  const axiosPrivate = useAxiosPrivate();

  /**
   * fetcherPut
   *
   * A function that takes a string (url) and an object (arg) as parameters and returns a Promise.
   * The Promise resolves to the response data after the request is finished.
   *
   * @template T - The type of the object that is passed as the argument.
   * @template R - The type of the response data.
   * @param {string} url - The url of the request.
   * @param {{ arg: T }} arg - An object that contains the argument to be passed to the request.
   * @returns {Promise<R>} - A Promise that resolves to the response data.
   */
  const fetcherPut = async <T extends object | undefined, R>(
    url: string,
    { arg }: { arg: T }
  ): Promise<R> => axiosPrivate.put<R>(url, arg).then((res) => res.data);

  return fetcherPut;
};

export default useFetcherPut;
