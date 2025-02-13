export const validateCaptcha = (req, res, next) => {
    try {
        const params = new URLSearchParams({
            secret: '', //Ingresar secret key de recaptcha
            response: req.body.captcha,
        });
        //console.log(params);
        fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            body: params,
        })
            .then((res) => res.json())
            .then((data) => {
            if (data.success) {
                next();
            }
            else {
                res.status(500).json({ message: 'El Captcha no es valido' });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//# sourceMappingURL=validateCaptcha.js.map