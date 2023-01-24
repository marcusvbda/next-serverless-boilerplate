const createMessageContent = (icon: string, message: string, colors: string[], documentWidth: number): HTMLDivElement => {
    let messageContent = document.createElement("div");
    let theHTML = `
        <span style='margin-right:20px'>${icon}</span>  
        <span style='margin-right:50px;color:${colors[1]}'>${message}</span>
        <a href='#' style="margin-left: auto;text-decoration:none;font-weight:400;font-size:1.1rem;color:${colors[1]}">X</a>
    `;
    messageContent.innerHTML = theHTML;
    messageContent.style.minWidth = documentWidth <= 800 ? "95%" : "30%";
    messageContent.style.width = "auto";
    messageContent.style.backgroundColor = colors[0];
    messageContent.style.borderLeft = `5px solid ${colors[1]}`;
    messageContent.style.color = colors[1];
    messageContent.style.height = "63px";
    messageContent.style.alignItems = "center";
    messageContent.style.display = "flex";
    messageContent.style.textAlign = "center";
    messageContent.style.borderRadius = "5px";
    messageContent.style.padding = "0 2rem";

    return messageContent
}

const createMessageDiv = (content: HTMLDivElement, timeout: number): HTMLDivElement => {
    const listMessagens = document.querySelectorAll(".alert-div") ?? [];
    let initialPosition = !listMessagens.length ? 0 : ((listMessagens[listMessagens.length - 1] as any)?.offsetTop ?? 0) + 40;
    const middlePosition = `${initialPosition + 60}px`;
    const finalPosition = `${initialPosition + 30}px`;

    let messageDiv = document.createElement("div");
    messageDiv.className = "alert-div";
    messageDiv.style.transition = ".3s";
    messageDiv.style.position = "absolute";
    messageDiv.style.alignItems = "center";
    messageDiv.style.display = "flex";
    messageDiv.style.textAlign = "center";
    messageDiv.style.justifyContent = "center";
    messageDiv.style.top = "-1000px";
    messageDiv.style.width = "100%";
    messageDiv.style.zIndex = "9999";
    messageDiv.appendChild(content);
    setTimeout(() => {
        messageDiv.style.top = middlePosition;
        setTimeout(() => {
            messageDiv.style.top = finalPosition;
        }, 300);
    });

    const removeMessage = () => {
        messageDiv.style.top = "-1000px";
        setTimeout(() => {
            messageDiv.remove();
        }, 500);
    }

    setTimeout(() => removeMessage(), timeout)
    content.querySelector("a")?.addEventListener("click", (evt) => {
        evt.preventDefault();
        removeMessage();
    });
    return messageDiv;
}

const createMessageElement = (icon: string, colors: string[], message: string, timeout: number) => {
    const documentWidth = document.querySelector("html")?.clientWidth ?? 0;
    const content = createMessageContent(icon, message, colors, documentWidth)
    const div = createMessageDiv(content, timeout)

    document.querySelector("body")?.appendChild(div);
}

export const showMessage = (type: string, message: string, timeout: number = 4000) => {
    const icons: { [index: string]: string } = {
        error: "❌",
        success: "✅",
        warning: "⚠️",
        info: "❕"
    }

    const colors: { [index: string]: string[] } = {
        error: ["#FFE7E6", "#ff5757"],
        success: ["#E4F8F0", "#1ea97c"],
        warning: ["#FFF2E2", "#cc8925"],
        info: ["#e8e8e8", "#8f8f8f"],
    }

    const icon = icons[type] ?? icons.info;
    const color = colors[type] ?? colors.info;
    setTimeout(() => {
        createMessageElement(icon, color, message, timeout);
    }, 100)
}

export const error = (message: string, timeout: number = 4000) => {
    showMessage('error', message)
}

export const success = (message: string, timeout: number = 4000) => {
    showMessage('success', message)
}

export const warning = (message: string, timeout: number = 4000) => {
    showMessage('warning', message)
}

export const info = (message: string, timeout: number = 4000) => {
    showMessage('info', message)
}