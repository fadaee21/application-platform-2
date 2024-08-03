// import useRefreshToken from "@/hooks/context/useRefreshToken"

import useReverseGeocoding from "@/hooks/useReverseGeocoding";

const DashboardPage = () => {
  // const refresh = useRefreshToken()
  const latitude = 35.7836858;
  const longitude = 51.4563171;
  const { addressData, isLoading } = useReverseGeocoding(latitude, longitude);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(addressData);
  return (
    <div>
      DashboardPage
      <h1>{addressData?.formatted_address}</h1>
      {/* <button onClick={() => refresh?.()}>Refresh</button> */}
    </div>
  );
};

export default DashboardPage;
