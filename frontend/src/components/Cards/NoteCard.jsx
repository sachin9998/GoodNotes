import moment from "moment";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  isPinned,
  tags,
  onPinNote,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="box-shadow rounded p-4 bg-white  hover:box-shadow1 transition-all ease-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-md font-semibold">{title}</h6>
          <span className="text-xs text-green-700">
            {moment(date).format("MMMM Do YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-[#2B85FF]" : "text-slate-300"
          } `}
          onClick={onPinNote}
        />
      </div>

      {/* <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p> */}
      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500 ">
          {tags.map((item, index) => {
            return <span key={index}>{`#${item} `}</span>;
          })}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
