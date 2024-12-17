function Loader() {
  return (
    <div className='flex h-[calc(100vh-200px)] items-center justify-center'>
      <div className='loader'>
        <div className='loading-text'>
          Loading<span className='dot'>.</span>
          <span className='dot'>.</span>
          <span className='dot'>.</span>
        </div>
        <div className='loading-bar-background'>
          <div className='loading-bar'>
            <div className='white-bars-container'>
              <div className='white-bar'></div>
              <div className='white-bar'></div>
              <div className='white-bar'></div>
              <div className='white-bar'></div>
              <div className='white-bar'></div>
              <div className='white-bar'></div>
              <div className='white-bar'></div>
              <div className='white-bar'></div>
              <div className='white-bar'></div>
              <div className='white-bar'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
