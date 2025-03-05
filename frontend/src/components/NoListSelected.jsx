import clipBoardImg from "../assets/checklist.png";

export default function NoListSelected() {
  return (
    <div className="mx-auto my-auto flex flex-col gap-3 items-center">
      <img className="w-18" src={clipBoardImg} alt="Clipboard Image" />
      <p>No List Selected.</p>
    </div>
  );
}
