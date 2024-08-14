import useFetcherPost from "@/hooks/useFetcherPost";
import useSWR from "swr";

const Test = () => {
  const fetcherPost = useFetcherPost();
  const fetchUrl =
    "http://78.109.199.178:8080/v1/admins/user/search?page=0&size=10";
  const { data, isLoading } = useSWR(fetchUrl, {
    fetcher: () =>
      fetcherPost<{ userStatus: number }, unknown>(fetchUrl, {
        arg: {
          userStatus: 3,
        },
      }),
  });

  return (
    <div className="grid ">
      <h1>aaa</h1>
      {isLoading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default Test;
