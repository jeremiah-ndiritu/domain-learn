const topicsApiURL = "http://www.domain-learn.localhost:5010";
const topicsOverviewContainer = document.getElementById("topics-overview");

fetch(`${topicsApiURL}/api/topics`)
  .then((res) => res.json())
  .then((topics) => {
    const ol = document.createElement("ol");
    topics.forEach((t) => {
      const li = document.createElement("li");
      const el = document.createElement("a");
      el.style.textDecoration = "none";
      el.href = `/api/blogs/${t.id}`;
      el.target = "__blank";
      el.innerHTML = `${t.title}`;
      li.appendChild(el);
      ol.appendChild(li);
    });
    topicsOverviewContainer.appendChild(ol);
  });
