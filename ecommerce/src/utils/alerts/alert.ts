import Swal from "sweetalert2";

export const alert = (title: string, timer: number) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};
