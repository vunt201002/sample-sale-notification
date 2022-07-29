/**
 * Write log to StackDriver of Google Cloud Platform
 *
 * @param {*} err
 * @param {*} ctx
 * @return {Promise<void>}
 */
export async function handleError(err, ctx) {
  if (ctx.state.user) {
    // tslint:disable-next-line: no-console
    console.error(ctx.state.user.shop, err);
  } else {
    // tslint:disable-next-line: no-console
    console.error('Unauthenticated', err);
  }
}
