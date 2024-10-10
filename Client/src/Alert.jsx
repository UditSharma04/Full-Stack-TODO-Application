import React from 'react'
import Swal from 'sweetalert2'

const Alert = () => {

  const displayPopup = () => {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  const displaySuccessPopup = () => {
    Swal.fire({
      title: 'Success',
      text: 'Do you want to continue',
      icon: 'success',
      confirmButtonText: 'close'
    })
  }

  const displayPopupWith3btns = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  
  const deletePopup = () => {
    Swal.fire({
      title: "Sweet!",
      text: "Modal with a custom image.",
      imageUrl: "https://unsplash.it/400/200",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
  }

  return (
    <div className=' flex justify-center items-center h-screen w-screen flex-col gap-3'>
        <button onClick={displayPopup} className=' bg-black text-white rounded-md px-2 py-1'>Error popup</button>
        <button onClick={displaySuccessPopup} className=' bg-black text-white rounded-md px-2 py-1'>success popup</button>
        <button onClick={displayPopupWith3btns} className=' bg-black text-white rounded-md px-2 py-1'>popup with 3 btns</button>
        <button onClick={deletePopup} className=' bg-black text-white rounded-md px-2 py-1'>Image popUp</button>

    </div>
  )
}

export default Alert