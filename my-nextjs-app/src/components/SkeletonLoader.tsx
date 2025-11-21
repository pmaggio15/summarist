export function BookCardSkeleton() {
  return (
    <div style={{
      padding: '16px',
      margin: '-16px',
      borderRadius: '8px',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }}>
      <div style={{
        width: '100%',
        height: '200px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '12px'
      }}></div>
      <div style={{
        height: '16px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '8px',
        width: '90%'
      }}></div>
      <div style={{
        height: '14px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '8px',
        width: '70%'
      }}></div>
      <div style={{
        height: '14px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '8px',
        width: '60%'
      }}></div>
    </div>
  );
}

export function SelectedBookSkeleton() {
  return (
    <div style={{
      backgroundColor: '#fef8e7',
      padding: '32px',
      borderRadius: '8px',
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start',
      maxWidth: '700px'
    }}>
      <div style={{ flex: 1, maxWidth: '225px' }}>
        <div style={{
          height: '80px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
      </div>
      
      <div style={{ 
        width: '2px', 
        height: '180px', 
        backgroundColor: '#d4d4d4',
        margin: '0'
      }}></div>
      
      <div style={{
        width: '120px',
        height: '160px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginLeft: '24px',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}></div>
      
      <div style={{ marginLeft: '32px', flex: 1 }}>
        <div style={{
          height: '24px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          marginBottom: '12px',
          width: '80%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
        <div style={{
          height: '16px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          marginBottom: '12px',
          width: '60%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#e5e7eb',
          borderRadius: '50%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
      </div>
    </div>
  );
}

export function BookDetailSkeleton() {
  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
        <div style={{
          width: '200px',
          height: '300px',
          backgroundColor: '#e5e7eb',
          borderRadius: '8px',
          flexShrink: 0,
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
        
        <div style={{ flex: 1 }}>
          <div style={{
            height: '32px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
            marginBottom: '12px',
            width: '70%',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></div>
          <div style={{
            height: '20px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
            marginBottom: '20px',
            width: '40%',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></div>
          <div style={{
            height: '16px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
            marginBottom: '12px',
            width: '90%',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></div>
          <div style={{
            height: '16px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
            marginBottom: '20px',
            width: '85%',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></div>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '120px',
              height: '44px',
              backgroundColor: '#e5e7eb',
              borderRadius: '6px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}></div>
            <div style={{
              width: '120px',
              height: '44px',
              backgroundColor: '#e5e7eb',
              borderRadius: '6px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}></div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <div style={{
          height: '20px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          marginBottom: '16px',
          width: '100%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
        <div style={{
          height: '20px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          marginBottom: '16px',
          width: '95%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
        <div style={{
          height: '20px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          marginBottom: '16px',
          width: '90%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
      </div>
    </div>
  );
}

export function PlayerSkeleton() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 60px',
      backgroundColor: 'white'
    }}>
      <div style={{
        height: '40px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '24px',
        width: '70%',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}></div>

      <div style={{
        height: '20px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '16px',
        width: '100%',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}></div>
      <div style={{
        height: '20px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '16px',
        width: '95%',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}></div>
      <div style={{
        height: '20px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '16px',
        width: '90%',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}></div>
      <div style={{
        height: '20px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '16px',
        width: '100%',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}></div>
      <div style={{
        height: '20px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginBottom: '16px',
        width: '85%',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}></div>
    </div>
  );
}