const React = require("react");

const SocialIcon = ({ url, bgColor, className }) => {
    return (
        <div data-testid="social-icon" className={className} style={{ backgroundColor: bgColor }}>
            Mock Social Icon for {url}
        </div>
    );
};

module.exports = { SocialIcon };
