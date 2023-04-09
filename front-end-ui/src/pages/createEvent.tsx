import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateEvent = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [desc, setDesc] = useState("");
  const [apply, setApply] = useState("");
  const [aim, setAim] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.user.role == "STUDENT") {
      navigate("/");
    }
  });

  const postFair = async(event: any) => {
    event.preventDefault()
    const user = JSON.parse(localStorage.getItem("user")!);
        const formData = new FormData()
        formData.append("image", file!)
        formData.append("name", name)
        formData.append("date", date)
        formData.append("link", link)
        formData.append("desc", desc)
        formData.append("apply", apply)
        formData.append("aim", aim)
        formData.append("userId", user.user.id)
    
        const result = await fetch("http://localhost:8000/api/event", {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
              Accept: "multipart/form-data",
              "Access-Control-Allow-Origin": "http://localhost",
            },
            redirect: "follow",
            body: formData
        }).then(async(response) => {
          if(!response.ok) {
            console.log(await response.json())
          }else {
            toast.success('Your fair has been created.', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
            return navigate("/fairs");
          }
        });
  }

  return (
    <>
    <ToastContainer />
    <div className="flex min-h-screen items-center justify-center p-5 ">
      <form className="grid gap-5 border-2 rounded-lg shadow-lg p-10 md:w-3/5 justify-center" onSubmit={postFair}>
        <div className="text-center">
          <h1 className="text-5xl font-bold">Create A Fair</h1>
          <small>Start creating a fair for your university or collage.</small>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="text-sm">
            Fair Title
          </label>
          <input
            id="name"
            type="text"
            className="border-2 shadow-lg max-w-[500px] h-8 border-black rounded-lg p-5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="image" className="text-sm">
            Fair Image
          </label>
          <input
            id="image"
            type="file"
            className="border-2 shadow-lg max-w-[500px] h-8 border-black rounded-lg "
          onChange={(e) => setFile(e?.target?.files?.[0])} 
          accept="image/*"
          required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="date" className="text-sm">
            Date of Event
          </label>
          <input
            id="date"
            type="datetime-local"
            className="border-2 shadow-lg max-w-[500px] h-8 border-black rounded-lg p-5"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="link" className="text-sm">
            Fair Link
          </label>
          <input
            id="link"
            type="text"
            className="border-2 shadow-lg max-w-[500px] h-8 border-black rounded-lg p-5"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="desc" className="text-sm">
            Fair Description
          </label>
          <textarea
            id="desc"
            rows={5}
            className="border-2 shadow-lg max-w-[500px]  border-black rounded-lg p-5"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="apply" className="text-sm">
            Who can apply?
          </label>
          <textarea
            id="apply"
            rows={5}
            className="border-2 shadow-lg max-w-[500px]  border-black rounded-lg p-5"
            value={apply}
            onChange={(e) => setApply(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="aim" className="text-sm">
            Aim of this Fair
          </label>
          <textarea
            id="aim"
            rows={5}
            className="border-2 shadow-lg max-w-[500px]  border-black rounded-lg p-5"
            value={aim}
            onChange={(e) => setAim(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full justify-center bg-green-800 flex text-white px-10 py-3 rounded-lg hover:bg-green-700 transition-all"
        >
          Host your fair
        </button>
      </form>
    </div>
    </>
  );
};

export default CreateEvent;
