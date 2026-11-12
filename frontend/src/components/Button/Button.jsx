
import './Button.scss'
import { Link } from 'react-router-dom'

function Button({
    variant = 'button',
    buttonType = 'button',
    link,
    onClick,
    children,
    className = '',
    disabled = false,
    ariaLabel,
    ariaCurrent,
    ariaDescribedBy,
    title,
    target,
    rel,
    id
}) {
    return (
        <div className="button">
            {variant === 'button' && (
                <button
                    id={id}
                    type={buttonType}
                    className={`button_container ${className}`}
                    onClick={onClick}
                    disabled={disabled}
                    aria-label={ariaLabel}
                    aria-current={ariaCurrent}
                    aria-describedby={ariaDescribedBy}
                    title={title}
                >
                    {children}
                </button>
            )}

            {variant === 'link' && (
                <a
                    id={id}
                    className={`button_container ${className}`}
                    href={link}
                    target={target}
                    rel={rel}
                    aria-label={ariaLabel}
                    aria-current={ariaCurrent}
                    aria-describedby={ariaDescribedBy}
                    title={title}
                >
                    {children}
                </a>
            )}
        </div>
    );
}

export default Button;