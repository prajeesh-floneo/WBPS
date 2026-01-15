export const FloneoBadge = () => {
  return (
    <a
      href="https://floneo.co/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        textDecoration: 'none',
        padding: '6px 10px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        fontSize: '12px',
        zIndex: 40,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.25)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img
          style={{ width: '20px', height: '20px', marginRight: '8px' }}
          src="/floneo-logo.png"
          alt="Floneo Logo"
        />
        <p
          style={{
            color: '#000000',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
            fontSize: '12px',
            alignItems: 'center',
            marginBottom: 0,
          }}
        >
          Powered by Floneo
        </p>
      </div>
    </a>
  );
};

