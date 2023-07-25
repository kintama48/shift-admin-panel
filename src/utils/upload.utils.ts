export const uploadToPresignedUrl = async (url: string, file: File) => {
  const res = await fetch(url, {
    method: "PUT",
    body: file, // upload the actual file data
  });
  if (res.ok) {
    // Return the response in the format that Ant Design's Upload component expects
    return {
      url: res.url,
    };
  } else {
    // Handle upload error
    return {
      status: "error",
      response: { message: "Upload failed" },
    };
  }
};
