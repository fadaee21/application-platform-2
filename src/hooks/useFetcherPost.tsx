// import axios from "axios";
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
  const fetcherPost = async <T extends object, R>(
    url: string,
    { arg }: { arg: T }
  ): // ): Promise<R> => {
  //   const headers = {
  //     Authorization: "Bearer test_access_token", //TODO: JUST FOR NOW THE LOGIN IS NOT OK
  //   };
  //   const res = await axios.post<R>(url, arg, { headers }); //TODO: JUST FOR NOW THE LOGIN IS NOT OK
  //   return res.data;
  // };
  Promise<R> => axiosPrivate.post<R>(url, arg).then((res) => res.data);

  return fetcherPost;
};

export default useFetcherPost;

//1- if you need to fetch data with POST method use this:

// const fetcherPost = useFetcherPost();

// const fetchUrl =
//   "http://78.109.199.178:8080/v1/admins/user/search?page=0&size=10";

// const { data, isLoading } = useSWR(fetchUrl, {
//   fetcher: () =>
//     fetcherPost<any, any>(fetchUrl, {
//       arg: {
//         userStatus: 3,
//       },
//     }),
// });

//  2- if you want to GET data with POST method when the page is first rendered and the argument state changes, use this:

// const fetcherPost = useFetcherPost();

// const fetchUrl = (key: string | undefined = "") =>
//   `http://78.109.199.178:8080/v1/admins/user/search?page=0&size=10&key=${key}`;

// const { data, isLoading } = useSWR(
//   selectedOption?.value ? fetchUrl(selectedOption.value) : null,
//   (url) =>
//     fetcherPost<any, any>(url, {
//       arg: {
//         userStatus: selectedOption?.value,
//       },
//     })
// );

//  3- if you want to POST data with POST method use this:

//  const fetcherPost = useFetcherPost();

//   const { trigger, isMutating } = useSWRMutation(
//      "/panel/login",
//      fetcherPost<TLoginInfo, LoginResponse>
//    );

//    const response = await trigger({
//    password: pwd,
//    username: user,
//    role,
//  });
