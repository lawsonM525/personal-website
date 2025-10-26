export const links = {
    "social_media": {
        "LinkedIn": "https://www.linkedin.com/in/michelle-o-lawson/",
        "Twitter": "https://twitter.com/michellextech",
        "Instagram": "https://www.instagram.com/michellescomputer/",
        "TikTok": "https://www.tiktok.com/@michellescomputer"
    },
    "professional": {
        "Portfolio": "https://www.yourportfolio.com",
        "GitHub": "https://github.com/lawsonm525"
    },
    "personal": {
        "Blog": "https://www.yourblog.com",
        "YouTube": "https://www.youtube.com/channel/yourchannelid"
    }
}

export type LinkCategories = keyof typeof links;
export type LinkNames = "GitHub" | "LinkedIn" | "Instagram" | "TikTok" | "Email";

