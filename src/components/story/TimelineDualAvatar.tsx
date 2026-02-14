export function TimelineDualAvatar() {
  return (
    <figure className="timeline-avatar-frame" aria-hidden="true">
      <div className="timeline-avatar-sparkle timeline-avatar-sparkle-a" />
      <div className="timeline-avatar-sparkle timeline-avatar-sparkle-b" />
      <div className="timeline-avatar-row">
        <div className="timeline-avatar timeline-avatar-a">
          <span className="timeline-avatar-eye timeline-avatar-eye-left" />
          <span className="timeline-avatar-eye timeline-avatar-eye-right" />
        </div>
        <div className="timeline-avatar timeline-avatar-b">
          <span className="timeline-avatar-eye timeline-avatar-eye-left" />
          <span className="timeline-avatar-eye timeline-avatar-eye-right" />
        </div>
      </div>
    </figure>
  );
}
