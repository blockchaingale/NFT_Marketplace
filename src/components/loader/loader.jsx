import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <TailSpin
        height="25"
        width="25"
        color="#E90404"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{ justifyContent: "center" }}
        wrapperClass=""
        visible={true}
      />
    </>
  );
};

export default Loader;
 