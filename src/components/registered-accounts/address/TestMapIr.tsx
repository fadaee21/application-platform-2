// import React, { useState } from "react";
// const API_KEY =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUyMWM3ZDlmNzE1OGI1ZWI3NjdmYjhlMTBiOTY3MTY2MGJmMGJiNThmY2NjMDQyMTEyYWQzYzRlZTJiN2ZhM2NkZDM0OTM0YmRhYmNhNDVhIn0.eyJhdWQiOiIxODY1MSIsImp0aSI6IjUyMWM3ZDlmNzE1OGI1ZWI3NjdmYjhlMTBiOTY3MTY2MGJmMGJiNThmY2NjMDQyMTEyYWQzYzRlZTJiN2ZhM2NkZDM0OTM0YmRhYmNhNDVhIiwiaWF0IjoxNjU3MzQ5Nzc3LCJuYmYiOjE2NTczNDk3NzcsImV4cCI6MTY1OTk0MTc3Nywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.flIFXTDCP8_uHvbF2xYPE0vipsOe9AB14PYsekLAn9XbX7tp6Si9OUPW_wrQUmboFyWw_Q7RrgbXvivLdKRV-9kJiGhxhSG1XDACZQ_dTEFrwmfx1iZSL5J6Vkb7orcOtmOVpCp2U8203PFi0_ZFbdWnevyeVpZyGIgFRdfdmoS2WnboioIy4A9vi6OfbQ7LMcrmkw4EyivcydTb87NL3UPUMyleeu6dtRwW8F5995UuB3RQVmZ6llqZjbaSevdJN1UJK1KifoCiInsWRK5Ie4W0W-dV3zB0zXiaKpNOhAmThO8eXt0PoOoLKVkB0GxOwTzjdDKO4j89b02MDdrNwQ";
// const TestMapIr = () => {
//   const [address, setAddress] = useState("");

//   const getAddressFromCoordinates = async (
//     latitude: number,
//     longitude: number
//   ) => {
//     const url = `https://map.ir/reverse?lat=${latitude}&lon=${longitude}&x-api-key=${API_KEY}`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data && data.address) {
//         setAddress(data.postal_address);
//       } else {
//         setAddress("Address not found");
//       }
//     } catch (error) {
//       console.error("Error fetching address:", error);
//       setAddress("Error fetching address");
//     }
//   };



//   return (
//     <div>
//       <button onClick={() => getAddressFromCoordinates(latitude, longitude)}>
//         Get Address
//       </button>
//       <p>Address: {address}</p>
//     </div>
//   );
// };

// export default TestMapIr;


const TestMapIr = () => {
  return (
    <div>TestMapIr</div>
  )
}

export default TestMapIr