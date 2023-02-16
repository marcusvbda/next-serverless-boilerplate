
import { messages, color } from "@/styles/variables";

const createMessageContent = (icon: string, message: string, colors: string[], documentWidth: number, timeout: number): HTMLDivElement => {
    let messageContent = document.createElement("div");
    let theHTML = `
        <span style='margin-right:20px'>${icon}</span>  
        <span style='margin-right:50px;color:${colors[1]}'>${message}</span>
        <a href='#' style="margin-left: auto;text-decoration:none;font-weight:400;font-size:1.1rem;color:${colors[1]}">X</a>
    `;
    messageContent.innerHTML = theHTML;
    messageContent.style.width = documentWidth <= 800 ? "90%" : "40%";
    messageContent.style.backgroundColor = colors[0];
    messageContent.style.borderLeft = `5px solid ${colors[1]}`;
    messageContent.style.color = colors[1];
    messageContent.style.transition = ".3s";
    messageContent.style.height = "63px";
    messageContent.style.alignItems = "center";
    messageContent.style.display = "flex";
    messageContent.style.textAlign = "center";
    messageContent.style.borderRadius = "5px";
    messageContent.style.padding = "0 2rem";
    messageContent.style.top = "-1000px";
    messageContent.style.marginBottom = "8px";
    messageContent.style.position = "absolute";

    setTimeout(() => {
        messageContent.style.top = "20px";
        setTimeout(() => {
            messageContent.style.position = "relative";
            messageContent.style.top = "8px";
        }, 300);
    }, 100);

    const removeMessage = () => {
        messageContent.style.position = "absolute";
        messageContent.style.top = "-1000px";
        setTimeout(() => {
            messageContent.remove();
            const el = document.querySelector(".alert-div");
            if (el && el.children.length == 0) {
                el.remove();
            }
        }, 500);
    }

    setTimeout(() => removeMessage(), timeout);
    messageContent.querySelector("a")?.addEventListener("click", (evt) => {
        evt.preventDefault();
        removeMessage();
    });

    return messageContent
}

const createMessageDiv = (content: HTMLDivElement, customStyles: any = {}): HTMLDivElement => {
    const alertDiv = document.querySelector(".alert-div");
    if (!alertDiv) {
        let messageDiv = document.createElement("div");
        messageDiv.className = "alert-div";
        messageDiv.style.position = "fixed";
        messageDiv.style.alignItems = "center";
        messageDiv.style.flexDirection = "column";
        messageDiv.style.display = "flex";
        messageDiv.style.textAlign = "center";
        messageDiv.style.transition = ".3s";
        messageDiv.style.justifyContent = "center";
        messageDiv.style.top = "-1000px";
        messageDiv.style.width = "100%";
        messageDiv.style.zIndex = "9999";
        messageDiv.style.top = "10px";

        for (const styleIndex in customStyles) {
            messageDiv.style[styleIndex as any] = customStyles[styleIndex];
        }

        messageDiv.appendChild(content);
        return messageDiv;
    } else {
        alertDiv.appendChild(content);
        return alertDiv as HTMLDivElement;
    }
}

const createMessageElement = (content: HTMLDivElement, customStyles: any = {}): HTMLDivElement => {
    const div = createMessageDiv(content, customStyles);
    document.querySelector("body")?.appendChild(div);
    return div;
}

export const showMessage = (type: string, message: string, timeout: number = 4000) => {
    const icons: { [index: string]: string } = messages.dark.icons;

    const colors: { [index: string]: string[] } = messages.dark.colors;

    const icon = icons[type] ?? icons.info;
    const color = colors[type] ?? colors.info;
    setTimeout(() => {
        const documentWidth = document.querySelector("html")?.clientWidth ?? 0;
        const content = createMessageContent(icon, message, color, documentWidth, timeout)
        createMessageElement(content);
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

export const confirm = (title: string, message: string, callback: any, options: any = {}) => {
    const confirmButtonText = options.confirmButtonText ?? "Confirm";
    const cancelButtonText = options.cancelButtonText ?? "Cancel";
    let messageContent = document.createElement("div");
    const styleBtn = "width: 50%;padding: 7px;border-radius: 8px;border: unset;transition: .3s;cursor: pointer;";

    let theHTML = `
            <div style="border-radius:8px;padding: 1.5rem;background-color: ${color.dark.secondary};display:flex;flex-direction:column;">
                <h4 style="font-weight: bold;font-size: 1.1rem;margin-bottom: 15px;">${title}</h4>
                <span>${message}</span>
                <div style="margin-top:20px;display: flex;justify-content: space-around;gap:10px;">
                    <button id="btn-cancel" style="${styleBtn}background-color:${color.dark.terthiary};"
                    onMouseOver="this.style.backgroundColor='${color.dark.terthiaryHover}'"
                    onMouseOut="this.style.backgroundColor='${color.dark.terthiary}'"
                >
                    ${cancelButtonText}
                </button>
                    <button id="btn-confirm" style="${styleBtn}background-color:${color.dark.primary};"
                        onMouseOver="this.style.backgroundColor='${color.dark.primaryHover}'"
                        onMouseOut="this.style.backgroundColor='${color.dark.primary}'"
                    >
                        ${confirmButtonText}
                    </button>
                </div>
            </div>
    `;
    messageContent.innerHTML = theHTML;
    messageContent.style.padding = '20px';
    messageContent.style.maxWidth = '500px';

    const body = document.body;
    const customStyles = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed',
        backgroundColor: color.dark.overflow,
        padding: 20,
        minHeight: body.offsetHeight ?? 0,
    };

    const messageDiv = createMessageElement(messageContent, customStyles);
    const html = document.querySelector('html');
    if (html) {
        html.style.overflow = "hidden";
    }

    const closeDialog = () => {
        const html = document.querySelector('html');
        if (html) {
            html.style.overflow = '';
        }
        messageDiv.remove();
    }

    messageContent.querySelector("button#btn-cancel")?.addEventListener("click", async (evt) => {
        evt.preventDefault();
        callback && await callback(false);
        closeDialog();
    });

    messageContent.querySelector("button#btn-confirm")?.addEventListener("click", async (evt) => {
        evt.preventDefault();
        callback && await callback(true);
        closeDialog();
    });
}