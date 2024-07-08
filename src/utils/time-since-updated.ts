export function getTimeSinceUpdated(createdAt: Date, now = new Date()) {
  if (now.getTime() - createdAt.getTime() < 1000 * 60) {
    return "just now";
  }

  if (now.getTime() - createdAt.getTime() < 1000 * 60 * 60) {
    const minutes = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60),
    );
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (now.getTime() - createdAt.getTime() < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60),
    );
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (now.getTime() - createdAt.getTime() < 1000 * 60 * 60 * 24 * 30) {
    const days = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  if (now.getTime() - createdAt.getTime() < 1000 * 60 * 60 * 24 * 365) {
    const months = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30),
    );
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  const years = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365),
  );
  return `${years} year${years === 1 ? "" : "s"} ago`;
}
