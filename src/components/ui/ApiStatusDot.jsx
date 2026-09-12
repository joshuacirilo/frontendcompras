function ApiStatusDot({ offline = false, label = "API con fallos; mostrando datos mock" }) {
  if (!offline) return null;

  return (
    <span
      className="api-status-dot"
      title={label}
      aria-label={label}
      role="img"
    />
  );
}

export default ApiStatusDot;
