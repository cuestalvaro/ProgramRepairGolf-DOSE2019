package unrc.dose;

import java.io.IOException;
import java.util.Arrays;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.LazyList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.beerboy.ss.SparkSwagger;
import spark.Service;

public class App
{
	static final Logger LOGGER = LoggerFactory.getLogger(App.class);
	
    public static void main( String[] args ) {
      Service spark = Service.ignite().port(55555);
      

      try {
        SparkSwagger
          .of(spark).before((request, response) -> {
              if (!Base.hasConnection()) {
                  Base.open();
                }
              }).after((request, response) -> {
                  if (Base.hasConnection()) {
                      Base.close();
                    }
              })
          .endpoints(() -> Arrays.asList(new BellyEndpoint(), new UserStatEndpoint()))
          .generateDoc();
      }
      catch(IOException e) {
        LOGGER.error(e.getMessage());
      }

      spark.get("/hello/:name", (req, res) -> {
        return "hello" + req.params(":name");
      });

      spark.get("/users", (req, res) -> {
        res.type("application/json");

        LazyList<User> users = User.findAll();

        return users.toJson(true, "username", "password");
      });
    }
}
