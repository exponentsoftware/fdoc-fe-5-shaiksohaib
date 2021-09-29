import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteAlbum } from "../../Redux/GeneralSlice";
import "./SingleCard.scss";
function SingleCard(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div
      className="singleCard d-flex flex-column p-1 mx-3"
      onClick={() => history.push(`/albums?id=${props?.data?.id}`)}
    >
      <div className="row flex-grow-1">
        <div className="col-12 position-relative d-flex justify-content-center">
          <img
            src={
              props?.data?.album_cover === null ||
              props?.data?.album_cover === ""
                ? "/noAlbumCover.png"
                : props?.data?.album_cover?.name
                ? URL?.createObjectURL(props?.data?.album_cover)
                : props?.data?.album_cover
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
        <div className="col-12 album_title text-white">
          {props?.data?.album_title || "--"}
        </div>
        <div className="col-12 d-flex justify-content-between align-items-center text-white">
          <div className="artist">{props?.data?.artist || "--"}</div>
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
              onClick={() => dispatch(deleteAlbum(props?.data?.id))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
