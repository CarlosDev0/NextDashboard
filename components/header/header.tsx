import "./header.css";
const header = () => {
  return (
    <div className="mainHeader">
      <center>
        <img src={"/logo.png"} className="mr-3 h-6 sm:h-9" alt="logo" />
        App Multiservicios
      </center>
    </div>
  );
};

export default header;
