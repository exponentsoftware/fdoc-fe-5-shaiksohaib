import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteAlbum } from "../../Redux/GeneralSlice";
import "./SinglePlayList.scss";
function SinglePlayList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div
      className="SinglePlayList d-flex flex-column p-1 mx-3"
      onClick={() => history.push(`/playlist-details?id=${props?.data?.id}`)}
    >
      <div className="row flex-grow-1">
        <div className="col-12 position-relative d-flex justify-content-center">
          <img
            src={
              props?.data?.cover === null || props?.data?.cover === ""
                ? "/noAlbumCover.png"
                : props?.data?.cover?.name
                ? URL?.createObjectURL(props?.data?.cover)
                : props?.data?.cover
            }
            alt=""
            className="cover"
          />
          <div className="playButtonWrap">
            <button className="playButton">&#x25BA;</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 name text-white">
          {props?.data?.name || "--"}
        </div>
        <div className="col-12 d-flex justify-content-between align-items-center text-white">
          <div className="user">{props?.data?.user || "--"}</div>
          <div
            className={`${
              props?.isDeletable && props?.isDeletable === "false" && "d-none"
            }`}
          >
            <img
              src="/delete.svg"
              height={30}
              alt="del"
              className="src"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePlayList;
