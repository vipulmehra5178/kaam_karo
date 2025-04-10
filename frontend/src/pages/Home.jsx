function Home() {
    return (
      <div className="text-center">
        <h1 className="text-primary">Welcome to the Job Board</h1>
        <p><a href="/login" className="btn btn-outline-primary m-2">Login</a></p>
        <p><a href="/register" className="btn btn-primary">Register</a></p>
      </div>
    );
  }
  
  export default Home;
  