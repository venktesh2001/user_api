const BASE_URL = "http://localhost:3000/users";
async function runTests() {
  try {
    console.log("=== 1. GET all users ===");
    let res = await fetch(BASE_URL);
    let data = await res.json();
    console.log(data);

    console.log("\n=== 2. CREATE user ===");
    res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Venktesh", email: "venktesh@example.com" }),
    });
    data = await res.json();
    console.log(data);

    const userId = data.id;

    console.log("\n=== 3. GET user by ID ===");
    res = await fetch(`${BASE_URL}/${userId}`);
    data = await res.json();
    console.log(data);

    console.log("\n=== 4. UPDATE user ===");
    res = await fetch(`${BASE_URL}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Venktesh Updated" }),
    });
    data = await res.json();
    console.log(data);

    console.log("\n=== 5. DELETE user ===");
    res = await fetch(`${BASE_URL}/${userId}`, { method: "DELETE" });
    data = await res.json();
    console.log(data);

    console.log("\n=== 6. GET all users (should be empty) ===");
    res = await fetch(BASE_URL);
    data = await res.json();
    console.log(data);

  } catch (err) {
    console.error(err);
  }
}

runTests();