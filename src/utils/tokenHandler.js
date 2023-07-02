import i18n from 'i18n';

export class TokenResponseHandler {
  static async sendTokenResponse({
    user,
    users,
    message,
    statusCode,
    data,
    req,
    res,
  }) {
    const token =
      (await user?.getSignedJwtToken()) || req.user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    };

    const responsePayload = {
      success: true,
      message: i18n.__(message),
      ...(Array.isArray(users?.data) ? { users } : data ? {} : { user }),
      ...(user && !Array.isArray(users?.data) && !data ? { token } : {}),
      ...(data && { data }),
    };

    res
      .status(statusCode)
      .cookie('token', token, options)
      .json(responsePayload);
  }
}
