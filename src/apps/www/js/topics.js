const topicsApiURL = "http://www.domain-learn.localhost:5010";
const tryContainer = document.getElementById("topics-div");
if (!tryContainer) {
  const c = document.createElement("div");
  c.id = "topics-div";
  c.className = "topics-div";
  document.appendChild(c);
}
const topicsContainer = document.getElementById("topics-div");
getTopics();
async function getTopics() {
  const res = await fetch(`${topicsApiURL}/api/topics`);
  const topics = (await res.json()) || [];

  topics.forEach((tpc) => {
    const topicCard = document.createElement("div");
    topicCard.className = "topic-card";
    topicCard.id = "topic" + (tpc?.id || "00");
    topicCard.innerHTML = `
        <h1>${tpc.id}. ${tpc.title}</h1>
        <p>${tpc.overview}</p><a href=${tpc.link} target='__blank'>Learn More 🔗</a>
    `;
    topicsContainer.appendChild(topicCard);
  });
}
