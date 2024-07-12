import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { SWRConfig } from "swr";
import useAxiosPrivate from "./hooks/context/useAxiosPrivate";

function App() {
  const axiosPrivate = useAxiosPrivate();
  const fetcherGet = (url: string) => axiosPrivate.get(url).then((res) => res.data);
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: fetcherGet,
        onErrorRetry({ retryCount }) {
          if (retryCount > 4) return;
        },
      }}
    >
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </SWRConfig>
  );
}

export default App;
