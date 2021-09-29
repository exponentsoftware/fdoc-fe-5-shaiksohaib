import "./AlbumsDetails.scss";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import NestedMenu from "../../module/NestedMenu/NestedMenu";
function AlbumsDetails() {
  const history = useHistory();
  const [page, setPage] = useState("");
  const [dispData, setDispData] = useState("");
  const AlbumData = useSelector((state) => state.global?.AlbumData);
  useEffect(() => {
    if (queryString?.parse(history?.location?.search)?.id) {
      let pageNum = queryString?.parse(history?.location?.search)?.id || 1;
      let filterData =
        AlbumData.length > 0 &&
        AlbumData?.filter((x) => x.id.toString() === pageNum);
      if (filterData.length > 0) {
        setPage(pageNum);
        setDispData(filterData[0]);
      } else {
        history.push("/");
      }
    } else {
      history.push("/");
    }
  }, [AlbumData, history]);

  return (
    <div className="albumsDetails">
      <div className="head_section text-white">
        <div className="row mw-100 pt-3 pb-5 info_section bg-primary">
          <div className="col-md-2 ps-5">
            <img
              src={
                dispData?.album_cover === null || dispData?.album_cover === ""
                  ? "/noAlbumCover.png"
                  : dispData?.album_cover?.name
                  ? URL?.createObjectURL(dispData?.album_cover)
                  : dispData?.album_cover
              }
              alt=""
              className="cover"
              height={150}
              width={150}
            />
          </div>
          <div className="col-md-10 d-flex flex-column justify-content-end">
            <div className="text-uppercase">playlist</div>
            <h1 className="text-capitalize p-0 m-0">{dispData?.album_title}</h1>
            <div>subtitle</div>
            <div>
              <strong>spotifychats</strong> &#9679;{" "}
              {dispData?.songs?.reduce((ac, ce) => ac + ce?.likes?.length, 0)}{" "}
              likes &#9679; {dispData?.songs?.length} songs, 3 hr
            </div>
          </div>
        </div>
        <div className="row mw-100 py-3 icon_section">
          <div className="col-md-12 d-flex align-items-center ps-5 ">
            <div className="mx-3">
              <i class="fas fa-play-circle fa-3x text-primary" />
            </div>
            <div className="mx-3">
              {false ? (
                <i class="fas fa-heart fa-2x text-primary" />
              ) : (
                <i class="far fa-heart fa-2x text-primary" />
              )}
            </div>
            <div className="mx-3">
              <i class="fas fa-ellipsis-h fa-2x " />
            </div>
          </div>
        </div>
      </div>

      <div className="table_container my-3 px-5">
        <table className="table table-borderless">
          <thead className="text-white text-uppercase border-bottom ">
            <tr>
              <td className="text-end">
                <span className="">#</span>
              </td>
              <td className="text-start">
                <span className="pe-2">Title</span>
              </td>
              <td className="text-center">
                <span className="pe-2">Plays</span>
              </td>
              <td className="text-center">
                <span className="">Album</span>
              </td>
              <td className="text-center">
                <span>
                  <i class="fas fa-clock" />
                </span>
              </td>
            </tr>
          </thead>
          <tbody className="text-dark1 fs-14">
            {dispData?.songs?.length === 0 ? (
              <tr> No music avalable in the album</tr>
            ) : (
              dispData?.songs?.map((elem, idx) => (
                <tr key={elem?.id} className="align-middle">
                  <td className="text-end">{idx}</td>
                  <td className="text-start">
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src={
                            elem?.song_cover === null || elem?.song_cover === ""
                              ? "/noAlbumCover.png"
                              : elem?.song_cover?.name
                              ? URL?.createObjectURL(elem?.song_cover)
                              : elem?.song_cover
                          }
                          alt="song cover"
                          className="src"
                          height={40}
                        />
                      </div>
                      <div className="col-md-10 d-flex flex-column text-white">
                        <span className="d-block">{elem?.title || "--"}</span>
                        <span className="d-block">
                          {elem?.artists.join(", ") || "--"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{elem?.plays || "--"}</td>
                  <td className="text-center">{elem?.parent_album || "--"}</td>
                  <td className="text-center tr_special_opton">
                    <i class="far fa-heart cp" />{" "}
                    <span className="mx-2">{elem?.duration || "-:--"}</span>{" "}
                    {/* <i class="fas fa-ellipsis-h" /> */}
                    <NestedMenu songData={elem} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlbumsDetails;
