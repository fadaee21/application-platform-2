import useSWR from "swr";
//https://platform.neshan.org/api/reverse-geocoding/
const useReverseGeocoding = (latitude: number, longitude: number) => {
  const { data: addressData, isLoading } = useSWR<INeshan>(
    latitude && longitude
      ? `https://api.neshan.org/v5/reverse?lat=${latitude}&lng=${longitude}`
      : null,
    {
      fetcher: (url) =>
        fetch(url, {
          headers: {
            "Api-Key": import.meta.env.VITE_API_KEY,
          },
        }).then((res) => res.json()),
    }
  );

  return { addressData, isLoading };
};

export default useReverseGeocoding;
