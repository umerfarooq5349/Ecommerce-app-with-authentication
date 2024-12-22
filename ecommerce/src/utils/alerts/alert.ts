import Swal from "sweetalert2";

export const alert = (title: string, timer: number) => {
  Swal.fire({
    position: "bottom-right",
    title,
    toast: true,
    timerProgressBar: true,
    showConfirmButton: false,
    timer,
  });
};
