import { useState } from "react";

export default function ProfilePhoto() {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);

  if (failed) {
    return (
      <div className="profile-photo profile-photo-fallback" aria-hidden="true">
        RS
      </div>
    );
  }

  return (
    <>
      <img
        src="/profile.jpg"
        alt="Rahul Singh"
        className="profile-photo"
        onError={() => setFailed(true)}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
      />
      {open && (
        <div className="photo-lightbox" onClick={() => setOpen(false)}>
          <img src="/profile.jpg" alt="Rahul Singh" className="photo-lightbox-img" />
        </div>
      )}
    </>
  );
}