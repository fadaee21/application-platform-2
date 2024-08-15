import useAxiosPrivate from "./context/useAxiosPrivate";

/**
 * useFetcherPost
 *
 * This hook is used to fetch data from server with POST method.
 * It uses the private axios instance which has the token in its header.
 *
 * @returns A function that takes a string (url) and an object (arg) as parameters and returns a Promise.
 * The Promise resolves to the response data after the request is finished.
 *
 * @example
 * const fetcherPost = useFetcherPost();
 *
 *  const { trigger, isMutating } = useSWRMutation(
 *    "/panel/login",
 *    fetcherPost<TLoginInfo, LoginResponse>
 *  );
 *
 *  const response = await trigger({
 *       password: pwd,
 *       username: user,
 *       role,
 *     });
 *
 *
 */
const useFetcherPost = () => {
  const axiosPrivate = useAxiosPrivate();

  /**
   * fetcherPost
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
  const fetcherPost = async <T extends object | undefined, R>(
    url: string,
    { arg }: { arg: T }
  ): Promise<R> => axiosPrivate.post<R>(url, arg).then((res) => res.data);

  return fetcherPost;
};

export default useFetcherPost;
