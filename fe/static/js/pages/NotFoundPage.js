function NotFoundPage() {
  console.log("404");
  return {
    element: `
    <div class="not-found">
      <h1>404 Not Found</h1>
    </div>
  `,
  };
}

export default NotFoundPage;
