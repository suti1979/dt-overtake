import { revalidatePath } from "next/cache";
import { useForm } from "react-hook-form";

declare global {
  interface Window {
    add_modal: {
      showModal: () => void;
      close: () => void;
    };
  }
}

type FormData = {
  firstName: string;
  fileInput: FileList;
};

export default function AddDriverModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("file", data.fileInput[0]);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/drivers/add`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.add_modal.close();
      });

    // revalidatePath("/drivers");
  };

  return (
    <div>
      <button
        className="btn btn-primary mb-4"
        onClick={() => window.add_modal.showModal()}
      >
        Add driver
      </button>
      <dialog id="add_modal" className="modal">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="dialog"
          className="modal-box"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => window.add_modal.close()}
          >
            ✕
          </button>
          <input
            type="text"
            placeholder="Drivers name"
            className={`input input-bordered w-full max-w-xs mb-4 ${
              errors.firstName ? "input-error" : ""
            }`}
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <p className="text-red-500 mb-4">This field is required</p>
          )}
          <input
            type="file"
            className={`file-input file-input-bordered w-full max-w-xs mb-4 ${
              errors.firstName ? "input-error" : ""
            }`}
            {...register("fileInput", { required: true })}
          />
          {errors.fileInput && (
            <p className="text-red-500 mb-4">This field is required</p>
          )}
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
