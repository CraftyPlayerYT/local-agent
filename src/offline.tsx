
export default function Offline() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#101114",
        color: "#ffffff",
        fontFamily: "Inter, Arial, sans-serif",
        textAlign: "center",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontSize: "64px" }}>📡</div>

      <h1>Connexion indisponible</h1>

      <p style={{ color: "#999999" }}>
        Impossible de se connecter au réseau.
        <br />
        Vérifie ta connexion Internet.
      </p>

      <p style={{ fontSize: "14px", color: "#666666" }}>
        L'application se reconnectera automatiquement.
      </p>
    </main>
  );
}
