import org.scalatest.matchers.ShouldMatchers
import org.scalatest.{ GivenWhenThen, FeatureSpec }
import test.`package`._

class RelatedFeatureTest extends FeatureSpec with GivenWhenThen with ShouldMatchers {

  feature("Related links") {

    scenario("Shows related links") {

      given("there is an article 'Woman tortured during burglary tells of waterboarding ordeal'")
      HtmlUnit("/related/UK/uk/2012/aug/07/woman-torture-burglary-waterboard-surrey") { browser =>
        import browser._

        then("I should see the related links")
        $("li") should have length 10

      }
    }

    /*
   Scenario: Should have (optional) picture, link text, trail text
   Scenario: Hidden links should only have headline, trail text
   Scenario: Expanders should 'show more', then 'show less'
   Scenario: Number of 'more' items should be represented by a number
   Scenario: Appear *after* the comments 
   Scenario: If has no Story Package, then show Related Links
   Scenario: Each item in the list should contain a relative date stamp - Eg, 'published 1 minute/hour/day ago' 
   Scenario: Links in the story package should *not* contain the current article (deduplicated)
   Scenario: 404
   Scenario: 5xx 
*/

    scenario("Shows article metadata for each related link") {

      given("there is an article 'Woman tortured during burglary tells of waterboarding ordeal'")
      HtmlUnit("/related/UK/uk/2012/aug/07/woman-torture-burglary-waterboard-surrey") { browser =>
        import browser._

        then("I should see the headline, trail text and pictures for each related link")

        val article = findFirst("li")
        article.findFirst("img").getAttribute("src") should be("http://static.guim.co.uk/sys-images/Money/Pix/pictures/2007/09/26/Burglar84.jpg")
        article.findFirst("p").getText should be("Crime falls by 4%, latest figures show")
        article.findFirst(".trailtext").getText should be("Knife murders down by a third, but burglaries and robberies on the rise")

      }
    }

  }
}

