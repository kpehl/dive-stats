-- Total Number of Dives by a Diver
SELECT COUNT(diver_id) AS number_of_dives
FROM dives
WHERE diver_id = 1
GROUP BY diver_id;

-- Average Duration of Dive at a Location
SELECT AVG(duration)::INT AS average_duration FROM dives
WHERE location_id = 1
GROUP BY location_id;

-- Most Active Month in the Previous Year for Diving
SELECT DATE_TRUNC('month', dive_date) AS month, COUNT(*) AS dive_count
FROM dives
WHERE dive_date > NOW() - INTERVAL '1 year'
GROUP BY month
ORDER BY dive_count DESC LIMIT 1;

-- Maximum Dive Depth at a Location
SELECT CONCAT(divers.first_name, ' ', divers.last_name) AS diver_name, dives.depth
FROM dives
LEFT JOIN divers ON dives.diver_id = divers.id
WHERE dives.depth = (
  SELECT MAX(depth)
  FROM dives
  WHERE location_id = 1
);

-- Most Common Certification at a Location
WITH certs AS (
  SELECT DISTINCT dives.diver_id, certifications.name from dives
  LEFT JOIN divers ON dives.diver_id = divers.id
  LEFT JOIN certifications ON divers.certification_id = certifications.id
  WHERE dives.location_id = 1
  GROUP BY dives.diver_id, certifications.name
)
SELECT name FROM certs
GROUP BY name
ORDER BY COUNT(name) DESC LIMIT 1;

-- Add EXPLAIN ANALYZE to a query to get information on the query run time, etc.