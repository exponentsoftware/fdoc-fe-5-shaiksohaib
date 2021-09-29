import { useHistory } from "react-router";
import SingleCard from "../SingleCard/SingleCard";
import "./Albums.scss";
function Albums(props) {
  return (
    <div className="albums my-5">
      <h1 className="ms-3">{props?.title || "Untitled"}</h1>
      <div className="albumscontainer d-flex align-items-center mt-2">
        {props?.data?.length <= 0 ? (
          <h1 className="text-white ps-5">No data found</h1>
        ) : (
          props?.data?.map((albumData) => (
            <SingleCard
              key={albumData?.id}
              data={albumData}
              delete={props?.delete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Albums;
