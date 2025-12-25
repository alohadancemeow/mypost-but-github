'use client';

const Footer = () => {
  const links = [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Security", href: "#" },
    { label: "Status", href: "#" },
    { label: "Docs", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "API", href: "#" },
  ];

  return (
    <footer className="mt-16 border-t border-[#30363D] pt-6 pb-4 px-5 md:px-0">
      <div className="flex flex-col gap-4 text-sm text-[#8B949E] sm:flex-row sm:items-center sm:justify-between">
        <div className="shrink-0">{`© ${new Date().getFullYear()} Mypost but Github, Inc.`}</div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#C9D1D9] hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
