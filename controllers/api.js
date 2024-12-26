const axios = require('axios');

function calculateRating(totalStars, totalCommits, totalPRs, totalIssues, contributedTo) {
    const score = (totalStars + totalCommits + totalPRs + totalIssues + contributedTo) / 5;
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C+';
    if (score >= 40) return 'C';
    if (score >= 30) return 'D+';
    return 'D';
}

function getRatingColor(rating) {
    switch (rating) {
        case 'A+': return '#4CAF50'; // Green
        case 'A': return '#8BC34A'; // Light Green
        case 'B+': return '#CDDC39'; // Lime
        case 'B': return '#FFEB3B'; // Yellow
        case 'C+': return '#FFC107'; // Amber
        case 'C': return '#FF9800'; // Orange
        case 'D+': return '#FF5722'; // Deep Orange
        case 'D': return '#F44336'; // Red
        default: return '#000000'; // Black
    }
}

async function index(req, res) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers = {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    try {
        // Fetch user data
        const userResponse = await axios.get('https://api.github.com/user', { headers });
        const user = userResponse.data;

        // Fetch repositories data
        const reposResponse = await axios.get('https://api.github.com/user/repos?per_page=100', { headers });
        const repos = reposResponse.data;

        // Calculate total stars
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        // Fetch contributions data
        const contributionsResponse = await axios.get(`https://api.github.com/search/commits?q=author:${user.login}+committer-date:>${new Date().getFullYear()}-01-01`, { headers });
        const totalCommits = contributionsResponse.data.total_count;

        // Fetch pull requests data
        const prsResponse = await axios.get(`https://api.github.com/search/issues?q=author:${user.login}+type:pr`, { headers });
        const totalPRs = prsResponse.data.total_count;

        // Fetch issues data
        const issuesResponse = await axios.get(`https://api.github.com/search/issues?q=author:${user.login}+type:issue`, { headers });
        const totalIssues = issuesResponse.data.total_count;

        // Fetch repositories contributed to in the last year
        const contributedToResponse = await axios.get(`https://api.github.com/search/repositories?q=user:${user.login}+pushed:>${new Date().getFullYear() - 1}-01-01`, { headers });
        const contributedTo = contributedToResponse.data.total_count;

        // Calculate rating
        const rating = calculateRating(totalStars, totalCommits, totalPRs, totalIssues, contributedTo);

        res.setHeader('Content-Type', 'image/svg+xml');
        return res.render('stats.svg.ejs', {
            login: user.login,
            name: user.name,
            bio: user.bio,
            avatarUrl: user.avatar_url,
            totalStars,
            totalCommits,
            totalPRs,
            totalIssues,
            contributedTo,
            rating,
            getRatingColor
        });
    } catch (error) {
        console.error('Error fetching data from GitHub API:', error);
        throw new Error('GitHub API request failed');
    }
}

async function username(req, res) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers = {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    const username = req.params.username || 'default-username'; // Ganti 'default-username' dengan username default Anda

    try {
        // Fetch user data
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, { headers });
        const user = userResponse.data;

        // Fetch repositories data
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
        const repos = reposResponse.data;

        // Calculate total stars
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        // Fetch contributions data
        const contributionsResponse = await axios.get(`https://api.github.com/search/commits?q=author:${username}+committer-date:>${new Date().getFullYear()}-01-01`, { headers });
        const totalCommits = contributionsResponse.data.total_count;

        // Fetch pull requests data
        const prsResponse = await axios.get(`https://api.github.com/search/issues?q=author:${username}+type:pr`, { headers });
        const totalPRs = prsResponse.data.total_count;

        // Fetch issues data
        const issuesResponse = await axios.get(`https://api.github.com/search/issues?q=author:${username}+type:issue`, { headers });
        const totalIssues = issuesResponse.data.total_count;

        // Fetch repositories contributed to in the last year
        const contributedToResponse = await axios.get(`https://api.github.com/search/repositories?q=user:${username}+pushed:>${new Date().getFullYear() - 1}-01-01`, { headers });
        const contributedTo = contributedToResponse.data.total_count;

        // Calculate rating
        const rating = calculateRating(totalStars, totalCommits, totalPRs, totalIssues, contributedTo);

        res.setHeader('Content-Type', 'image/svg+xml');
        console.log(user);
        return res.render('stats.svg.ejs', {
            login: user.login,
            name: user.name,
            bio: user.bio,
            avatarUrl: user.avatar_url,
            totalStars,
            totalCommits,
            totalPRs,
            totalIssues,
            contributedTo,
            rating,
            getRatingColor
        });
    } catch (error) {
        console.error('Error fetching data from GitHub API:', error);
        throw new Error('GitHub API request failed');
    }
}

module.exports = {
    index,
    username,
    getRatingColor
};